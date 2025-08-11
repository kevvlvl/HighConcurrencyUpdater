enum Country {
    CA = 'Canada',
    US = 'United States',
    MX = 'Mexico',
    ROW = 'Rest of the World'
}

interface CustomerDto {
    id: number,
    firstName: string,
    lastName: string,
    country: Country,
    version: number,
}

export { Country, CustomerDto }