<?php
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
date_default_timezone_set('America/New_York');
require_once 'meekrodb.2.1.class.php';
require_once 'db.config.php';
DB::$param_char = '%%';

switch ($_GET['action']) {
    case 'addEntry' :
        //-add = add new entry
        //---pass in postDate, amount (both required)
        //---return success/fail
        if ((isset($_GET['postDate'])) && (isset($_GET['amount']))) {
            $columns = array();
            $columns['postDate'] = $_GET['postDate'];
            $columns['amount'] = $_GET['amount'];
            $results = DB::insert('expenses', $columns);
        }
    break;

    case 'getEntry' :
        //-get = get list of entries for given postDate
        //---pass in start date and end date (both required)
        //---return *
        if ((isset($_GET['startDate'])) && (isset($_GET['endDate']))) {
            $results = DB::query('SELECT id, DATE_FORMAT(postDate, "%Y-%m-%d") as postDate, amount FROM expenses WHERE postDate >= %%s AND postDate < %%s ORDER BY postDate DESC', $_GET['startDate'], $_GET['endDate']);
        }
    break;

    case 'updateEntry' :
        // update = update previous entry
        // pass in id (required), amount, postDate (both optional)
        // return success/fail
        if (isset($_GET['id'])) {
            $columns = array();
            $columns['postDate'] = isset($_GET['postDate']) ? $_GET['postDate'] : NULL; //THIS IS WRONG
            $columns['amount'] = isset($_GET['amount']) ? $_GET['amount'] : NULL; //SO IS THIS
            $results = DB::update('expenses', $columns);
        }
    break;

    case 'deleteEntry' :
        // delete = remove entry
        // pass in id (required)
        // return success/fail
        if (isset($_GET['id'])) {
            $results = DB::delete('expenses', "id=%%s", $_GET['id']);
        }
    break;
}

//return query results as JSON
echo json_encode($results);