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

const fields = [
    "Registration ID",
    "College",
    "Github Profile",
    "Linkedin Profile",
    "Year",
    "Department",
    "Email Address",
    "Contact Number"
]

const formResponses = [
    {
        "Registration ID": "REG001",
        "College": "Springfield University",
        "Github Profile": "https://github.com/user1",
        "Linkedin Profile": "https://www.linkedin.com/in/user1",
        "Year": "Final",
        "Department": "Computer Science",
        "Email Address": "user1@example.com",
        "Contact Number": "123-456-7890"
    },
    {
        "Registration ID": "REG002",
        "College": "Shelbyville College",
        "Github Profile": "https://github.com/user2",
        "Linkedin Profile": "https://www.linkedin.com/in/user2",
        "Year": "Third",
        "Department": "Information Technology",
        "Email Address": "user2@example.com",
        "Contact Number": "123-456-7891"
    },
    {
        "Registration ID": "REG003",
        "College": "West Springfield University",
        "Github Profile": "https://github.com/user3",
        "Linkedin Profile": "https://www.linkedin.com/in/user3",
        "Year": "Second",
        "Department": "Electronics",
        "Email Address": "user3@example.com",
        "Contact Number": "123-456-7892"
    },
    {
        "Registration ID": "REG004",
        "College": "East Springfield Institute",
        "Github Profile": "https://github.com/user4",
        "Linkedin Profile": "https://www.linkedin.com/in/user4",
        "Year": "First",
        "Department": "Electrical",
        "Email Address": "user4@example.com",
        "Contact Number": "123-456-7893"
    },
    {
        "Registration ID": "REG005",
        "College": "North Springfield College",
        "Github Profile": "https://github.com/user5",
        "Linkedin Profile": "https://www.linkedin.com/in/user5",
        "Year": "Final",
        "Department": "Mechanical",
        "Email Address": "user5@example.com",
        "Contact Number": "123-456-7894"
    },
    {
        "Registration ID": "REG006",
        "College": "South Springfield University",
        "Github Profile": "https://github.com/user6",
        "Linkedin Profile": "https://www.linkedin.com/in/user6",
        "Year": "Third",
        "Department": "Civil",
        "Email Address": "user6@example.com",
        "Contact Number": "123-456-7895"
    },
    {
        "Registration ID": "REG007",
        "College": "Springfield Technology Institute",
        "Github Profile": "https://github.com/user7",
        "Linkedin Profile": "https://www.linkedin.com/in/user7",
        "Year": "Second",
        "Department": "Architecture",
        "Email Address": "user7@example.com",
        "Contact Number": "123-456-7896"
    },
    {
        "Registration ID": "REG008",
        "College": "Springfield Community College",
        "Github Profile": "https://github.com/user8",
        "Linkedin Profile": "https://www.linkedin.com/in/user8",
        "Year": "First",
        "Department": "Bioengineering",
        "Email Address": "user8@example.com",
        "Contact Number": "123-456-7897"
    },
    {
        "Registration ID": "REG009",
        "College": "Springfield Arts College",
        "Github Profile": "https://github.com/user9",
        "Linkedin Profile": "https://www.linkedin.com/in/user9",
        "Year": "Final",
        "Department": "Philosophy",
        "Email Address": "user9@example.com",
        "Contact Number": "123-456-7898"
    },
    {
        "Registration ID": "REG010",
        "College": "Springfield Business School",
        "Github Profile": "https://github.com/user10",
        "Linkedin Profile": "https://www.linkedin.com/in/user10",
        "Year": "Third",
        "Department": "Business Administration",
        "Email Address": "user10@example.com",
        "Contact Number": "123-456-7899"
    }
];


export function FormData({ form }) {
    return (
        <Table className='no-scrollbar whitespace-nowrap'>
            <TableHeader>
                <TableRow>
                    {
                        fields.map((i) => (
                            <TableHead>{i}</TableHead>
                        ))
                    }
                </TableRow>
            </TableHeader>
            <TableBody>
                {formResponses.map((resp) => (
                    <TableRow key={resp["Registration ID"]}>
                        {
                            fields.map((i) => (
                                <TableCell>{resp[i]}</TableCell>
                            ))
                        }
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
