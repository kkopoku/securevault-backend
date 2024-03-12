const mongoose = require("mongoose");
const { generateRandomString } = require("../utils");

const LinkSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  viewNumber: {
    type: Number,
    required: true,
    default: 1,
    validate: {
      validator: function (value) {
        return value >= 0;
      },
      message: (props) => `${props.value} must be a positive number!`,
    },
  },
  lifetime: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value >= 0;
      },
      message: (props) => `${props.value} must be a positive number!`,
    },
  },
  status: {
    type: String,
    enum: {
      values: ["Active", "Inactive"],
      message: "{VALUE} is not supported",
    },
    default: "Active",
  },
  passphrase: {
    type: String,
    required: false,
    default: null,
  },
  link: {
    type: String,
    unique: true,
  },
  expires_at: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  my_id: {
    type: String
  }
});

LinkSchema.pre("save", async function () {
  this.expires_at = new Date(this.created_at).getTime() + this.lifetime;
});

module.exports = mongoose.model("Link", LinkSchema);
