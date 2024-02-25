import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function FormData({ form }) {
    return (
        <Table className='no-scrollbar whitespace-nowrap'>
            <TableHeader>
                <TableRow>
                    {
                        form?.formFields.map((i) => (
                            <TableHead>{i}</TableHead>
                        ))
                    }
                </TableRow>
            </TableHeader>
            <TableBody>
                {form?.formResponses.map((resp) => (
                    <TableRow>
                        {
                            form?.formFields.map((i) => (
                                <TableCell>{JSON.parse(resp)[i]}</TableCell>
                            ))
                        }
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
