const handlebars = require('express-handlebars')
const Handlebars = require('handlebars');
var hbs = handlebars.create()
Handlebars.registerHelper('iff', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
function handlebar(app) {
    
    app.engine('hbs', handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending'
                }
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                }
                const icon = icons[sortType]
                const type = types[sortType]
                return ` <a href="?_sort&column=${field}&type=${type}">
                <span class="${icon}"></span>
            </a>`
            }
        }
    }));
}

module.exports = handlebar