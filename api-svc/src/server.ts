import express, {Express, Request, Response} from 'express';
import {updateCustomer} from "./customer/customerRepository";
import {CustomerDto} from "./customer/customerDto";

console.log('Happy developing ✨')

const server: Express = express();
const port: string = process.env.PORT || '3000';

server.use(express.json());

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