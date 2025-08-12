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

interface CustomerEntity {
    id: number,
    firstName: string,
    lastName: string,
    country: string,
    rowVersion: number,
}

interface RepositoryError {
    code: string,
    message: string,
}

export { Country, CustomerDto, CustomerEntity, RepositoryError }