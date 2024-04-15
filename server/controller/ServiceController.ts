import { Request, Response } from 'express';
import ServiceModel from '../models/Service';
const ServiceController = {
  createService: async (req: Request, res: Response) => {
    try {
      const { service_name, service_price } = req.body;
      const newService = await ServiceModel.create({
        ...req.body
      });
      if (newService) {
        res.status(200).json({
          code: 0,
          data:newService
        });
      } else {
        res.status(400).send({ msg: 'error' });
      }
    } catch (error) {
      res.status(500).send({ msg: 'Server error' });
    }
  },
  getService: async (_req: Request, res: Response) => {
    try {
      const data = await ServiceModel.find().sort('-createdAt');
      if (!data) res.status(404).send({ msg: 'not found' });
      res.json({ data });
    } catch (error: any) {
      return res.status(500).send({ msg: error.message });
    }
  },
  editService: async (req: Request, res: Response) => {
    try {
      const { service_name, service_price } = req.body;
      const updateTest = await ServiceModel.findOneAndUpdate(
        { _id: req.params.id },
        {
        ...req.body
        },
        { new: true },
      );
      res.json({ msg: 'update success', updateTest });
    } catch (err: any) {
      return res.status(500).send({ msg: 'Sever error' });
    }
  },
  deleteService: async (req: Request, res: Response) => {
    try {
      const service = await ServiceModel.findByIdAndDelete(req.params.id);
      if (!service) return res.status(404).send({ msg: 'Service not found' });
      res.json({ msg: 'delete success' });
    } catch (error: any) {
      res.status(500).json({ msg: 'Server error' });
    }
  },
};
export default ServiceController;
