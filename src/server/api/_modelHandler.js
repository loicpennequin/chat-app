const Bookshelf = require('./database.js');

module.exports = class Model {
    constructor(model, modelName) {
        this.name = modelName;
        this._model = Bookshelf.model(modelName, model);
    }

    async findAll(filter, options, params) {
        logger.debug(`${this.name}Model | findAll`);
        let rows;
        if (Array.isArray(JSON.parse(filter))) {
            rows = await this._model.forge().where(...JSON.parse(filter));
        } else {
            rows = await this._model
                .forge()
                .where(Object.assign({}, JSON.parse(filter)));
        }

        if (params && params.orderBy) {
            const parsed = JSON.parse(params.orderBy);
            rows = rows.orderBy(parsed[0], parsed[1]);
        }
        if (options && (options.limit || options.offset)) {
            rows = await rows.fetchPage({
                limit: options.limit,
                offset: options.offset
            });
        } else {
            rows = await rows.fetchAll(options);
        }
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
            : (await model.save(null, options)).toJSON(
                options ? options.serialize : ''
            );
    }

    async destroy(options) {
        options = Object.assign({ require: true }, options);
        return (await this._model
            .forge({ [this._model.prototype.idAttribute]: options.id })
            .destroy(options)).toJSON(options ? options.serialize : '');
    }

    async update(data, options) {
        options = Object.assign({ patch: true, require: true }, options);
        return (await this._model
            .forge({ [this._model.prototype.idAttribute]: options.id })
            .fetch(options)
            .then(
                model => (model ? model.save(data, options) : undefined)
            )).toJSON(options ? options.serialize : '');
    }
};
