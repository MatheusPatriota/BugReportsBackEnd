const ReportModel = require("../model/Report");

class ReportController {
  async createReport(request, response) {
    const room = new ReportModel(request.body);
    await room
      .save()
      .then((res) => {
        return response
          .status(200)
          .json({ msg: "Report criado com sucesso!", res });
      })
      .catch((error) => {
        return response
          .status(500)
          .json({ msg: "Error ao criar Report", error });
      });
  }

  async updateReport(request, response) {
    await ReportModel.findByIdAndUpdate(
      { _id: request.params.id },
      request.body
    )
      .then((res) => {
        return response
          .status(200)
          .json({ msg: "Report atualizado com sucesso!", res });
      })
      .catch((error) => {
        return response
          .status(500)
          .json({ msg: "Error ao atualizar Report", error });
      });
  }

  async getAllReports(request, response) {
    await ReportModel.find()
      .sort("created")
      .then((res) => {
        return response
          .status(200)
          .json({ msg: "Reports exibidos com sucesso!", res });
      })
      .catch((error) => {
        return response
          .status(500)
          .json({ msg: "Error ao exibir Reports", error });
      });
  }
  async getReport(request, response) {
    await ReportModel.findById({ _id: request.params.id })
      .then((res) => {
        return response
          .status(200)
          .json({ msg: "Reports exibida com sucesso!", res });
      })
      .catch((error) => {
        return response
          .status(500)
          .json({ msg: "Error ao exibir Report", error });
      });
  }
  async deleteReport(request, response) {
    await ReportModel.deleteOne({ _id: request.params.id })
      .then((res) => {
        return response
          .status(200)
          .json({ msg: "Reports deletados com sucesso!", res });
      })
      .catch((error) => {
        return response
          .status(500)
          .json({ msg: "Error ao deletar Report", error });
      });
  }
}

module.exports = new ReportController();