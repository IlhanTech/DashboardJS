import express from 'express';
import moment from 'moment';
import services from './services.js';

const aboutRouter = express.Router();

function getDashboardServices() {
    let serviceList = [];
    for (const key in services) {
        if (Object.hasOwnProperty.call(services, key)) {
            const service = services[key];
            let widgets = (service.widgets || []).map(widget => ({
                name: widget.name,
                description: widget.description,
                params: widget.params || []
            }));

            serviceList.push({
                name: key,
                widgets: widgets
            });
        }
    }
    return serviceList;
}

aboutRouter.get('/about.json', (req, res) => {
    const aboutInfo = {
        client: {
            host: req.ip
        },
        server: {
            current_time: moment().unix(),
            services: getDashboardServices()
        }
    };
    res.json(aboutInfo);
});

export default aboutRouter;
