const columns = [
    {
        id: 'id',
        label: 'Complain ID',
        minWidth: 100,
        align: "center"
    },
    {
        id: 'ComplainSubject',
        label: 'Subject',
        minWidth: 170,
        align: "center"
    },
    {
        id: 'ComplainStatus',
        label: 'Status',
        minWidth: 100,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'CreatedAt',
        label: 'Created Date',
        minWidth: 100,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'ComplainType',
        label: 'Type',
        minWidth: 70,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'ComplainSeverity',
        label: 'Complain Severity',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
];

const rowsData = [
    {
        id: "234532",
        ComplainSubject: "OPD",
        ComplainStatus: "Raised",
        CreatedAt: "05-Oct-2021",
        ComplainType: "05-Oct-2021"
    },
    {
        id: "234532",
        ComplainSubject: "OPD",
        ComplainStatus: "Raised",
        CreatedAt: "05-Oct-2021",
        ComplainType: "05-Oct-2021"
    },
    {
        id: "234532",
        ComplainSubject: "OPD",
        ComplainStatus: "Drain",
        CreatedAt: "05-Oct-2021",
        ComplainType: "05-Oct-2021"
    },
    {
        id: "234532",
        ComplainSubject: "Electricity",
        ComplainStatus: "In progress",
        CreatedAt: "05-Oct-2021",
        ComplainType: "05-Oct-2021"
    },
    {
        id: "2345",
        ComplainSubject: "Covid",
        ComplainStatus: "Resolved",
        CreatedAt: "27-Sep-2021",
        ComplainType: "05-Oct-2021"
    },

]

export { columns, rowsData };