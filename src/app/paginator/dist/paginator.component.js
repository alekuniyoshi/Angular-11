"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PaginatorComponent = void 0;
var core_1 = require("@angular/core");
var PaginatorComponent = /** @class */ (function () {
    function PaginatorComponent() {
    }
    PaginatorComponent.prototype.ngOnInit = function () {
        this.iniPaginator();
    };
    PaginatorComponent.prototype.ngOnChanges = function (change) {
        var paginatorUpdated = change['paginator'];
        if (paginatorUpdated.previousValue) {
            this.iniPaginator();
        }
    };
    PaginatorComponent.prototype.iniPaginator = function () {
        var _this = this;
        this.since = Math.min(Math.max(1, this.paginator.number - 4), this.paginator.totalPages - 5);
        this.to = Math.max(Math.min(this.paginator.totalPages, this.paginator.number + 4), 6);
        if (this.paginator.totalPages > 5) {
            this.pages = new Array(this.to - this.since + 1).fill(0).map(function (_valor, index) { return index + _this.since; });
        }
        else {
            this.pages = new Array(this.paginator.totalPages).fill(0).map(function (_valor, index) { return index + 1; });
        }
    };
    __decorate([
        core_1.Input()
    ], PaginatorComponent.prototype, "paginator");
    PaginatorComponent = __decorate([
        core_1.Component({
            selector: 'app-paginator',
            templateUrl: './paginator.component.html'
        })
    ], PaginatorComponent);
    return PaginatorComponent;
}());
exports.PaginatorComponent = PaginatorComponent;
