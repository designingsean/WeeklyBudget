WeeklyBudget
============

A simple app for tracking a weekly budget.

License
-------
[![Creative Commons by-sa](http://i.creativecommons.org/l/by-sa/3.0/us/88x31.png)](http://creativecommons.org/licenses/by-sa/3.0/us/deed.en_US)

WeeklyBudget by [Sean Ryan](http://designingsean.com) is licensed under a [Creative Commons Attribution-ShareAlike 3.0 United States License](http://creativecommons.org/licenses/by-sa/3.0/us/deed.en_US).

Required Libraries
------------------
jQuery 1.8.3

AngularJS 1.0.7

MomentJS 2.0.0

Meekro 2.1

Database Structure
------------------
expenses table:

    CREATE TABLE `expenses` (
      `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
      `postDate` date NOT NULL,
      `amount` decimal(6,2) NOT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

Misc
----
db.config.php file omitted for obvious reasons. Format is below:

    DB::$user = 'DBUSER';
    DB::$password = 'DBPASS';
    DB::$dbName = 'DBNAME';