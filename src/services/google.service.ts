"use server";

import {google} from "googleapis";
import credentials from "../../credentials.json";

const SCOPES = [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.readonly',
];

class GoogleService {
    authClient: any;

    constructor() {
        this.authClient = null;

        this.authorize({
            client_email: credentials.client_email,
            private_key: credentials.private_key.split(String.raw`\n`).join('\n'),
        });

        console.log("GoogleService initialized");
    }

    authorize(credentials: { client_email: string, private_key: string }) {
        this.authClient = new google.auth.GoogleAuth({
            credentials,
            scopes: SCOPES,
        })
    }

    async getFiles() {
        if (!this.authClient) {
            console.error("No access token");
            return;
        }

        const drive = google.drive({
            version: 'v3',
            auth: this.authClient,
        });

        const res = await drive.files.list({
            pageSize: 10,
            fields: 'nextPageToken, files(id, name)',
        });

        return res.data.files;
    }

    async getFilesInFolder(folderId: string) {
        if (!this.authClient) {
            console.error("No access token");
            return;
        }

        const drive = google.drive({
            version: 'v3',
            auth: this.authClient,
        });

        const folder = await drive.files.list({
            q: `'${folderId}' in parents and trashed=false`,
            fields: 'files(id, name)',
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

        const drive = google.drive({
            version: 'v3',
            auth: this.authClient,
        });

        const res = await drive.files.get({
            fileId,
            alt: 'media',
        }, {responseType: 'stream'});

        return res.data;
    }

    async readGoogleDoc(fileId: string) {
        if (!this.authClient) {
            console.error("No access token");
            return;
        }

        const drive = google.drive({
            version: 'v3',
            auth: this.authClient,
        });

        const res = await drive.files.export({
            fileId,
            mimeType: 'text/plain',
        });

        const text = res.data as string;
        return removeBOM(cleanQuotes(text));
    }

    async readGoogleSheet(fileId: string, season: string) {
        if (!this.authClient) {
            console.error("No access token");
            return;
        }

        const sheets = google.sheets({
            version: 'v4',
            auth: this.authClient,
        });

        const values = await sheets.spreadsheets.values.get({
            spreadsheetId: fileId,
            range: season,
        });
        
        return values.data;
    }
}

function removeBOM(content: string): string {
    if (content.charCodeAt(0) === 0xFEFF) {
        return content.slice(1);
    }
    return content;
}

function cleanQuotes(input: string): string {
    const quotePattern = /['‘’‚‛`"«»“”„‟]/g;
    return input.replace(quotePattern, '"');
}

export default GoogleService;