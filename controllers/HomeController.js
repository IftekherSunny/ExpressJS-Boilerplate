'use strict'


class HomeController
{
  /**
   * Home page.
   */
  getIndex(req, res, next) {
    res.render('index', { title: 'Express', layout: 'main' });
  }
}



module.exports = new HomeController;
