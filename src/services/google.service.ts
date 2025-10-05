"use server";

import {drive_v3, google, sheets_v4, storage_v1} from "googleapis";

const SCOPES = [
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.readonly",
];

const credentials = {
  client_email: process.env.CLIENT_EMAIL,
  private_key: process.env.PRIVATE_KEY.split(String.raw`\n`).join("\n"),
};

class GoogleService {
  static #instance: GoogleService;
  authClient: any;
  BUCKET_NAME = "gs://airballcup";
  #drive: drive_v3.Drive | undefined;
  #sheets: sheets_v4.Sheets | undefined;
  #storage: storage_v1.Storage | undefined;

  constructor() {
    this.authClient = null;
    this.authorize({
      client_email: credentials.client_email,
      private_key: credentials.private_key,
    });

    console.log("GoogleService initialized");
  }

  public static get instance() {
    if (!GoogleService.#instance) {
      GoogleService.#instance = new GoogleService();
    }
    return GoogleService.#instance;
  }

  get drive() {
    if (!this.#drive) {
      this.#drive = google.drive({
        version: "v3",
        auth: this.authClient,
      });
    }

    return this.#drive;
  }

  get sheets() {
    if (!this.#sheets) {
      this.#sheets = google.sheets({
        version: "v4",
        auth: this.authClient,
      });
    }

    return this.#sheets;
  }

  get storage() {
    if (!this.#storage) {
      this.#storage = google.storage({
        version: "v1",
        auth: this.authClient,
      });
    }

    return this.#storage;
  }

  authorize(credentials: { client_email: string; private_key: string }) {
    this.authClient = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });
  }

  async getFiles() {
    if (!this.authClient) {
      console.error("No access token");
      return;
    }

    const drive = this.drive;

    const res = await drive.files.list({
      pageSize: 10,
      fields: "nextPageToken, files(id, name)",
    });

    return res.data.files;
  }

  async getFilesInFolder(folderId: string) {
    if (!this.authClient) {
      console.error("No access token");
      return;
    }

    const drive = this.drive;

    const folder = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      fields: "files(id, name)",
    });

    if (!folder.data.files?.length) {
      console.error("Folder not found");
      return;
    }

    return folder.data.files;
  }

  async downloadFile(fileId: string) {
    if (!this.authClient) {
      console.error("No access token");
      return;
    }

    const drive = this.drive;

    const res = await drive.files.get(
      {
        fileId,
        alt: "media",
      },
      { responseType: "stream" }
    );

    return res.data;
  }

  async readGoogleDoc(fileId: string) {
    if (!this.authClient) {
      console.error("No access token");
      return;
    }

    const drive = this.drive;

    const res = await drive.files.export({
      fileId,
      mimeType: "text/plain",
    });

    const text = res.data as string;

    return removeBOM(cleanQuotes(text));
  }

  async readGoogleSheet(fileId: string, season: string) {
    if (!this.authClient) {
      console.error("No access token");
      return;
    }

    const sheets = this.sheets;

    const values = await sheets.spreadsheets.values.get({
      spreadsheetId: fileId,
      range: season,
    });

    return values.data;
  }

  async getAvailableSheets(fileId: string) {
    if (!this.authClient) {
      console.error("No access token");
      return;
    }

    const sheets = this.sheets;

    const res = await sheets.spreadsheets.get({
      spreadsheetId: fileId,
    });

    return res.data.sheets?.map(sheet => sheet.properties?.title).filter((value): value is string => !!value) ?? [];
  }
}

function removeBOM(content: string): string {
  if (content.charCodeAt(0) === 0xfeff) {
    return content.slice(1);
  }
  return content;
}

function cleanQuotes(input: string): string {
  const quotePattern = /['‘’‚‛`"«»“”„‟]/g;
  return input.replace(quotePattern, '"');
}

export default GoogleService;
