"use client";

import {ReactElement, useActionState, useState} from "react";
import {Season} from "@/payload-types.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import uploadAction from "@/contents/upload/actions.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircleIcon, CheckCircle, Download} from "lucide-react";

interface RankingUploadFormProps {
    seasons: Season[] | undefined;
}

const initialState = {
    success: false,
    message: "",
}

function RankingUploadForm({seasons}: RankingUploadFormProps): ReactElement {
    const [state, formAction, pending] = useActionState(uploadAction, initialState);
    const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);

    if (!seasons || seasons.length === 0) {
        return <main className={"size-full bg-secondary-500"}>
            <section className="p-8 bg-white rounded shadow-md max-w-2xl mx-auto mt-10">
                <h1 className="text-2xl font-bold mb-6">Upload Rankings</h1>
                <p className="text-gray-700">No seasons available for upload.</p>
            </section>
        </main>
    }

    function onValueChange(value: string) {
        const season = seasons?.find((s) => s.id === value) ?? null;
        setSelectedSeason(season);
    }

    return <section className={"w-full min-h-full pt-[104px] bg-secondary-500"}>
        <section className="h-full w-full flex flex-col gap-4 p-8 bg-white text-black rounded-lg border border-black shadow-md max-w-2xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6">Upload Rankings</h1>

            <p>
                The csv file should have the following format:
                <pre className={"mb-2"}>
                    Rank,Team,ELO
                </pre>
            </p>

            { selectedSeason && (
                <Button variant={"secondary"} asChild>
                    <a download href={`/rankings/upload/template/${selectedSeason.id}`} className={"flex items-center justify-center gap-2"}>
                        <Download /> Download Sample CSV
                    </a>
                </Button>
            )}

            <form
                action={formAction}
                method="POST"
                encType="multipart/form-data"
            >
                <div className="mb-4">
                    <Label htmlFor="season" className="block text-sm font-medium text-gray-700 mb-2">
                        Select Season
                    </Label>
                    <Select onValueChange={onValueChange} value={selectedSeason?.id}>
                        <SelectTrigger>
                            <SelectValue placeholder={"Choisissez une saison"}/>
                        </SelectTrigger>
                        <SelectContent>
                            {seasons.map((season) => (
                                <SelectItem
                                    key={season.id}
                                    value={season.id}
                                >
                                    {season.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {selectedSeason && (
                        <input type={'hidden'} name={"seasonId"} value={selectedSeason.id} />
                    )}
                </div>
                {selectedSeason && (<div className="mb-4">
                    <Label htmlFor="rankingFile" className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Ranking File
                    </Label>
                    <Input
                        type="file"
                        id="rankingFile"
                        name="rankingFile"
                        accept=".csv"
                        className="block w-full"
                        inputSize={"default"}
                        required
                        onClick={(e) => {
                            (e.target as HTMLInputElement).value = "";
                        }}
                    />
                </div>)}
                <Button
                    type="submit"
                    variant={"primary"}
                    size={"sm"}
                    disabled={!selectedSeason || pending}
                >
                    { pending ? <Spinner /> : "Upload" }
                </Button>
            </form>

            {state.message && (
                <Alert className={"mt-4"} variant={state.success ? 'success' : 'destructive'}>
                    {
                        state.success ? <CheckCircle /> : <AlertCircleIcon />
                    }
                    <AlertTitle>
                        {state.success ? 'Success' : 'Error'}
                    </AlertTitle>
                    <AlertDescription>
                        {state.message}
                    </AlertDescription>
                </Alert>
            )}
        </section>
    </section>
}

export default RankingUploadForm;