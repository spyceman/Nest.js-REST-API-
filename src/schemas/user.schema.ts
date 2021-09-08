import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
	@Prop({unique: true})
	login: string;

	@Prop()
	password: string;

	@Prop({default: 'user'})
	role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
