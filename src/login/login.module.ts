import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {LoginController} from "./login.controller";
import {LoginService} from "./login.service";
import {User, UserSchema} from "../schemas/user.schema";
import { JwtModule } from "@nestjs/jwt";

@Module({
	imports: [
		MongooseModule.forFeature([
			{name: User.name, schema: UserSchema},
		]),
		JwtModule.register({
			secret: 'secret',
			signOptions: {
				expiresIn: '1h'
			}
		})
	],
	providers: [LoginService,],
	controllers: [LoginController],
	exports: [LoginService, JwtModule]
})
export class LoginModule {}
