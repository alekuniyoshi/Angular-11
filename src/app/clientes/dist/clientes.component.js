"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClientesComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var operators_1 = require("rxjs/operators");
var ClientesComponent = /** @class */ (function () {
    function ClientesComponent(clienteService, activatedRoute) {
        this.clienteService = clienteService;
        this.activatedRoute = activatedRoute;
        this.clientes = [];
    }
    ClientesComponent.prototype.ngOnInit = function () {
        // let page: number = +  this.activatedRoute.snapshot.paramMap.get('pages');
        // this.activatedRoute.paramMap.subscribe(params => {
        //   let page: number = +params.get('page');
        var _this = this;
        //   if (!page) {
        //     page = 0;
        //   }
        this.clienteService
            .getClientes(0).pipe(operators_1.tap(function (response) {
            console.log('clientes.component');
            response.content.forEach(function (cliente) {
                console.log(cliente.name);
            });
        })).subscribe(function (response) { return _this.clientes = response.content; });
        // });
    };
    ClientesComponent.prototype["delete"] = function (cliente) {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: 'Are you sure?',
            text: 'You want to delete :' + cliente.name + ' ' + cliente.lastName,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
            if (result.value) {
                _this.clienteService["delete"](cliente.id).subscribe(function () {
                    _this.clientes = _this.clientes.filter(function (cli) { return cli !== cliente; });
                    sweetalert2_1["default"].fire('Cliente Eliminado!', "Cliente " + cliente.name + " eliminado con \u00E9xito.", 'success');
                });
            }
        });
    };
    ClientesComponent = __decorate([
        core_1.Component({
            selector: 'app-clientes',
            templateUrl: './clientes.component.html'
        })
    ], ClientesComponent);
    return ClientesComponent;
}());
exports.ClientesComponent = ClientesComponent;
