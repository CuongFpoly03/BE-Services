import mongoose, { Schema } from 'mongoose';

const refreshTokens = new Schema(
    {
        token: { type: String, require },
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'accounts' },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('refreshTokens', refreshTokens);
