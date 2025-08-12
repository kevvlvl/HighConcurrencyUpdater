import {CustomerEntity} from "./interfaces";
import {Country, CustomerDto} from "./interfaces";

function mapCustomerEntityToDto(entity: CustomerEntity): CustomerDto {
    return {
        id: entity.id,
        firstName: entity.firstName,
        lastName: entity.lastName,
        country: entity.country as Country,
        version: entity.rowVersion,
    }
}

function mapCustomerDtoToEntity(id: number, dto: CustomerDto): CustomerEntity {
    return {
        id: id,
        firstName: dto.firstName,
        lastName: dto.lastName,
        country: dto.country,
        rowVersion: dto.version,
    }
}

export { mapCustomerEntityToDto, mapCustomerDtoToEntity}