"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagicUrlModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const magic_url_schema_1 = require("../schema/magic-url-schema");
const magic_url_controller_1 = require("./magic-url.controller");
const magic_url_service_1 = require("./magic-url.service");
let MagicUrlModule = class MagicUrlModule {
};
MagicUrlModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: magic_url_schema_1.MagicUrl.name, schema: magic_url_schema_1.MagicUrlSchema }]),],
        controllers: [magic_url_controller_1.MagicUrlController],
        providers: [magic_url_service_1.MagicUrlService]
    })
], MagicUrlModule);
exports.MagicUrlModule = MagicUrlModule;
//# sourceMappingURL=magic-url.module.js.map