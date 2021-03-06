"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var es_1 = require("@angular/common/locales/es");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var common_1 = require("@angular/common");
var cliente_service_1 = require("./clientes/cliente.service");
var material_moment_adapter_1 = require("@angular/material-moment-adapter");
var datepicker_1 = require("@angular/material/datepicker");
var app_component_1 = require("./app.component");
var header_component_1 = require("./header/header.component");
var footer_component_1 = require("./footer/footer.component");
var directiva_component_1 = require("./directiva/directiva.component");
var clientes_component_1 = require("./clientes/clientes.component");
var paginator_component_1 = require("./paginator/paginator.component");
var form_component_1 = require("./clientes/form.component");
var animations_1 = require("@angular/platform-browser/animations");
var routers = [
    { path: '', redirectTo: './clientes', pathMatch: 'full' },
    { path: 'directivas', component: directiva_component_1.DirectivaComponent },
    { path: 'clientes', component: clientes_component_1.ClientesComponent },
    { path: 'clientes/page/:page', component: clientes_component_1.ClientesComponent },
    { path: 'clientes/form', component: form_component_1.FormComponent },
    { path: 'clientes/form/:id', component: form_component_1.FormComponent }
];
common_1.registerLocaleData(es_1["default"], 'es');
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                footer_component_1.FooterComponent,
                directiva_component_1.DirectivaComponent,
                clientes_component_1.ClientesComponent,
                form_component_1.FormComponent,
                paginator_component_1.PaginatorComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                router_1.RouterModule.forRoot(routers),
                ng_bootstrap_1.NgbModule,
                animations_1.NoopAnimationsModule,
                material_moment_adapter_1.MatMomentDateModule,
                datepicker_1.MatDatepickerModule
            ],
            providers: [cliente_service_1.ClienteService, { provide: core_1.LOCALE_ID, useValue: 'es' }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
