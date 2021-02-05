"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var cliente_service_1 = require("./cliente.service");
describe('ClienteService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(cliente_service_1.ClienteService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
