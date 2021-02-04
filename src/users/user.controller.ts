import { Request, Response } from "express";
import { Controller, Req, Res, Get } from "routing-controllers";

@Controller()
export class UserController {
	@Get("/users")
	getAll(@Req() request: Request, @Res() response: Response) {
		return response.send("Hello response!");
	}
}
