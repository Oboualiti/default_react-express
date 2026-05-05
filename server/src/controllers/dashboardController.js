function getDashboardData(req, res) {
  res.json({
    message: 'Welcome to your protected dashboard',
    stats: {
      usersOnline: 12,
      activeProjects: 4,
      monthlyRevenue: 9200,
    },
    user: req.user,
  });
}

module.exports = { getDashboardData };
