import * as Utils from "../utils/Utils";

class ReportController {
  async createReport(request, response) {
    const room = new Utils.ReportModel(request.body);
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
    await Utils.ReportModel.findByIdAndUpdate(
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
    await Utils.ReportModel.find()
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

  async getAllReportsByRoomId(request, response) {
    await Utils.ReportModel.find({ roomId: request.params.id })
      .sort("created")
      .then((res) => {
        if (res == null) {
          return response
            .status(404)
            .json("Sala não encontrada na nossa base de dados");
        }
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
  async getReportsByIdWithFilter(request, response) {
    if (request.params.status === "solved") {
      await Utils.ReportModel.find({ solved: true })
        .sort("created")
        .then((res) => {
          if (res == null) {
            return response
              .status(404)
              .json("Sala não encontrada na nossa base de dados");
          }
          return response
            .status(200)
            .json({ msg: "Reports exibidos com sucesso!", res });
        })
        .catch((error) => {
          return response
            .status(500)
            .json({ msg: "Error ao exibir Reports", error });
        });
    } else if (request.params.status === "underInvestigation") {
      await Utils.ReportModel.find({ underInvestigation: true })
        .sort("created")
        .then((res) => {
          if (res == null) {
            return response
              .status(404)
              .json("Sala não encontrada na nossa base de dados");
          }
          return response
            .status(200)
            .json({ msg: "Reports exibidos com sucesso!", res });
        })
        .catch((error) => {
          return response
            .status(500)
            .json({ msg: "Error ao exibir Reports", error });
        });
    } else {
      await Utils.ReportModel.find({ roomId: request.params.id })
        .sort("created")
        .then((res) => {
          if (res == null) {
            return response
              .status(404)
              .json("Sala não encontrada na nossa base de dados");
          }
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
  }

  async getReport(request, response) {
    await Utils.ReportModel.findById({ _id: request.params.id })
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
    await Utils.ReportModel.deleteOne({ _id: request.params.id })
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
