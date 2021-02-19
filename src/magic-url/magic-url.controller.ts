import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { MagicUrlService } from './magic-url.service';
import { MagicUrlDto } from './dto/magicUrl.dto'
import JwtAccessGuard from 'src/auth/jwt-access-guard';
@Controller('magic-url')
export class MagicUrlController {
    constructor(
        private magicUrlService: MagicUrlService
    ) { }

    @Post()
    @UseGuards(JwtAccessGuard)
    async createMagicUrl(@Req() req, @Body(ValidationPipe) magicUrlDto: MagicUrlDto, @Res() res) {
        const response = await this.magicUrlService.createMagicUrl(magicUrlDto, req.user);
        if (magicUrlDto.type == 'message') {
            return res.status(HttpStatus.OK).json({
                message: 'Magic Url Created SuccessFully',
                Url: process.env.BASE_URL + '/magic-url/msg/' + response
            })
        }
        else {
            return res.status(HttpStatus.OK).json({
                message: 'Magic Url Created SuccessFully',
                Url: process.env.BASE_URL + '/magic-url/' + response
            })
        }
    }

    @Get('msg/:uniqueId')
    async findMagicUrlMessage(@Req() req, @Res() res) {
        const response = await this.magicUrlService.findMagicUrl(req.params.uniqueId);
        if (response[0]) {
            return res.render('message', { message: response[1], expiry: response[2] })
        }
        else {
            return res.render('messageTimeout')
        }
    }

    @Get('/:uniqueId')
    async findMagicUrlLink(@Req() req, @Res() res) {
        const response = await this.magicUrlService.findMagicUrl(req.params.uniqueId);
        if (response[0]) {
            return res.redirect(response[1])
        }
        else {
            return res.render('messageTimeout')
        }
    }

    @Get()
    @UseGuards(JwtAccessGuard)
    async getMyOldData(@Req() req, @Res() res) {
        const response = await this.magicUrlService.getMyOldData(req.user);
        return res.status(HttpStatus.OK).json({
            message: 'Old data of current User',
            data: response
        })
    }
}
