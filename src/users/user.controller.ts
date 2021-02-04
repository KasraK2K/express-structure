import { Request, Response } from "express";
import { JsonController, Req, Res, Get } from "routing-controllers";

@JsonController("/users")
export class UserController {
	@Get()
	getAll(@Req() request: Request, @Res() response: Response) {
		return response.send("Hello response!");
	}
}
