const fs = require('fs');
const Bookshelf = require('./../services/database.js');
const toSlice = 'Model.js'.length;

let models = {};

class Model {
    constructor(model, modelName) {
        this._model = Bookshelf.model(modelName, model);
    }

    async findAll(filter, options, params) {
        let rows = await this._model
            .forge()
            .where(Object.assign({}, filter));
        if (params && params.orderBy){
            const parsed = JSON.parse(params.orderBy);
            rows = rows.orderBy(parsed[0], parsed[1]);
        }
        rows = await rows.fetchAll(options);
        return rows.toJSON(options ? options.serialize : '');
    }

    async findOne(query, options) {
        options = Object.assign({ require: true }, options);
        return (await this._model.forge(query).fetch(options)).toJSON(
            options ? options.serialize : ''
        );
    }

    async findById(id, options) {
        return await this.findOne(
            { [this._model.prototype.idAttribute]: id },
            options
        );
    }

    async create(data, options) {
        const model = await this._model.forge(data);
        const validationErrors = model.validationErrors();
        return validationErrors
            ? { error: { ...validationErrors } }
            : (await model.save(null, options)).toJSON(options ? options.serialize : '');
    }

    async destroy(options) {
        options = Object.assign({ require: true }, options);
        return (await this._model
            .forge({ [this._model.prototype.idAttribute]: options.id })
            .destroy(options)).toJSON(options ? options.serialize : '');
    }

    async update(data, options) {
        options = Object.assign({ patch: true, require: true }, options);
        return (await this_model
            .forge({ [this._model.prototype.idAttribute]: options.id })
            .fetch(options)
            .then(
                model => (model ? model.save(data, options) : undefined)
            )).toJSON(options ? options.serialize : '');
    }
}

fs.readdirSync(__dirname)
    .filter(file => {
        return file.indexOf('.') !== 0 && file !== 'index.js';
    })
    .forEach(file => {
        const name = file.slice(0, file.length - toSlice);
        const model = require(`./${file}`);
        models[name] = new Model(model, name);
    });

module.exports = models;
