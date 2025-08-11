import {CustomerEntity} from "./customerEntity";
import {Country, CustomerDto} from "./customerDto";

function mapCustomerEntityToDto(entity: CustomerEntity): CustomerDto {
    return {
        id: entity.id,
        firstName: entity.firstName,
        lastName: entity.lastName,
        country: entity.country as Country,
        version: entity.rowVersion,
    }
}

function mapCustomerDtoToEntity(dto: CustomerDto): CustomerEntity {
    return {
        id: dto.id,
        firstName: dto.firstName,
        lastName: dto.lastName,
        country: dto.country,
        rowVersion: dto.version,
    }
}

export { mapCustomerEntityToDto, mapCustomerDtoToEntity}