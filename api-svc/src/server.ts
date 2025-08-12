import express, {Express, Request, Response} from 'express';
import {createCustomer, getCustomer, updateCustomer} from "./customer/customerRepository";
import {CustomerDto} from "./customer/customerDto";
import {CustomerEntity} from "./customer/customerEntity";
import {mapCustomerEntityToDto} from "./customer/customerMapper";

console.log('Happy developing ✨')

const server: Express = express();
const port: string = process.env.PORT || '3000';

server.use(express.json());

server.get('/api/customer/:id', async (req: Request<{ id: number }>, res: Response) => {

    let customerId: number = req.params.id;

    try {
        const customerFound: CustomerEntity | null = await getCustomer(customerId);

        if(customerFound != null) {
            const dto: CustomerDto = mapCustomerEntityToDto(customerFound);
            res.send(JSON.stringify(dto));
        }
    } catch(err: any) {

        console.log(err);

        if(err.code == 'UPDATE_CONFLICT') {
            res.status(409).json({
                error: 'Optimistic Locking',
                details: 'version mismatch for the requested customer ID'
            })
        } else {
            res.status(500).json({
                error: 'Internal Server Error',
                details: err.message
            })
        }
    }
})

server.post('/api/customer', async (req: Request<{}>, res: Response) => {

    let reqData: CustomerDto = req.body as CustomerDto;

    try {
        await createCustomer(reqData);
        res.sendStatus(201);
    } catch(err: any) {

        console.log(err);

        res.status(500).json({
            error: 'Internal Server Error',
            details: err.message
        })
    }
})

server.put('/api/customer/:id', async (req: Request<{ id: number }>, res: Response) => {

    let customerId: number = req.params.id;
    let reqData: CustomerDto = req.body as CustomerDto;

    try {
        await updateCustomer(customerId, reqData);
        res.sendStatus(204);
    } catch(err: any) {

        console.log(err);

        if(err.code == 'UPDATE_CONFLICT') {
            res.status(409).json({
                error: 'Optimistic Locking',
                details: 'version mismatch for the requested customer ID'
            })
        } else {
            res.status(500).json({
                error: 'Internal Server Error',
                details: err.message
            })
        }
    }
})

server.listen(port, () => {
    console.log("Server listening on port", port);
})