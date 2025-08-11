interface CustomerEntity {
    id: number,
    firstName: string,
    lastName: string,
    country: string,
    rowVersion: number,
}

export { CustomerEntity }