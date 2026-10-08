const mongoose = require("mongoose");

const repairRequestSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
      unique: true,
    },

    customerId: {
      type: String,
      default: "",
    },

    customerName: {
      type: String,
      default: "",
    },

    customerPhone: {
      type: String,
      default: "",
    },

    equipment: {
      type: String,
      required: true,
    },

    equipmentType: {
      type: String,
      default: "",
    },

    customEquipment: {
      type: String,
      default: "",
    },

    problem: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["New", "In progress", "Completed"],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.RepairRequest ||
  mongoose.model("RepairRequest", repairRequestSchema);