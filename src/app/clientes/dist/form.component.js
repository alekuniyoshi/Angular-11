"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FormComponent = void 0;
var core_1 = require("@angular/core");
var cliente_1 = require("./cliente");
var sweetalert2_1 = require("sweetalert2");
var FormComponent = /** @class */ (function () {
    function FormComponent(clienteService, router, activatedRoute) {
        this.clienteService = clienteService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.title = 'Add Client';
        this.cliente = new cliente_1.Cliente();
    }
    FormComponent.prototype.ngOnInit = function () {
        this.addClients();
    };
    FormComponent.prototype.addClients = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var id = params['id'];
            if (id) {
                _this.clienteService
                    .getCliente(id)
                    .subscribe(function (cliente) { return (_this.cliente = cliente); });
            }
        });
    };
    FormComponent.prototype.create = function () {
        var _this = this;
        this.clienteService.create(this.cliente).subscribe(function (cliente) {
            _this.router.navigate(['/clientes']);
            sweetalert2_1["default"].fire('New Client', 'Client: ' + cliente.name + ' ' + cliente.lastName, 'success');
        }, function (err) {
            _this.errors = err.error.errors;
            console.log("Cod of error from backend:" + err.status);
            console.log(err.error.errors);
        });
    };
    FormComponent.prototype.update = function () {
        var _this = this;
        this.clienteService.update(this.cliente).subscribe(function (json) {
            _this.router.navigate(['/clientes']);
            sweetalert2_1["default"].fire(json.mensaje, 'Client Edited: ' + _this.cliente.name + ' ' + _this.cliente.lastName, 'success');
        }, function (err) {
            _this.errors = err.error.errors;
            console.log("Cod of error from backend:" + err.status);
            console.log(err.error.errors);
        });
    };
    FormComponent = __decorate([
        core_1.Component({
            selector: 'app-form',
            templateUrl: './form.component.html'
        })
    ], FormComponent);
    return FormComponent;
}());
exports.FormComponent = FormComponent;
