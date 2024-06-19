import mongoose, {Schema , Document} from 'mongoose'


//this extends document brings the features of the document into the interface too
export interface Message extends Document {
    content: string;
    createdAt: Date
}

const MessageSschema: Schema<Message> = new Schema({
    content: {
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})


export interface User extends Document {
    username: string;
    password: string;
    email: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[]
    //nothing very special but message field ek array of objects hi hoga and us object ka shape or structure is determined by the Message interface
}

const UserSschema: Schema<User> = new Schema({
    username: {
        type:String,
        required:[true, "Username is required"],
        trim:true,
        unique:true
    },
    password: {
        type:String,
        required:[true, "Password is required"]
    },
    email: {
        type:String,
        required:[true, "Username is required"],
        unique:true,
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"]
    },
    verifyCode: {
        type:String,
        required:[true, "VerifyCode is required"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verifyCodeExpiry: {
        type:Date,
        required:[true, "VerifyCoded expiry is required"]
    },
    isAcceptingMessage: {
        type:Boolean,
        required:[true, "Username is required"]
    },
    messages: [MessageSschema]

})

//exporting the model in next is a bit diff
const UserModel = (
    mongoose.models.User as mongoose.Model<User>
) || (mongoose.model<User>('User' , UserSschema))

export default UserModel