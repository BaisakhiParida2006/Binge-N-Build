const getDashboardAnalytics = require("../services/analyticsService");

exports.getDashboard = async (req, res) => {

    try {

        const dashboard = await getDashboardAnalytics(req.user.id);

        res.status(200).json({

            success: true,

            dashboard

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
