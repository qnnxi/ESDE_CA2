// Import controlers
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const checkUserFn = require('./middlewares/checkUserFn');
const checkUserFnSolution = require('./middlewares/checkUserFnSolution');
const validateFn = require('./middlewares/validateFn');
const verifyTokenFn = require('./middlewares/verifyTokenFn');
const log = require('npmlog');


// Match URL's with controllers
exports.appRoute = router => {
    log.level = 'info';

    // router.post('/api/user/login', (req, res) => {
    //     log.info('Request', 'POST /api/user/login', 'Request payload:', req.body);
    //     authController.processLogin(req, res);
    // });

    router.post('/api/user/login', authController.processLogin);

    router.post('/api/user/register', (req, res) => {
        log.info('Request', 'POST /api/user/register', 'Request payload:', req.body);
        validateFn.validateRegister(req, res, () => {
            authController.processRegister(req, res);
        });
    });

    router.post('/api/user/process-submission', (req, res) => {
        log.info('Request', 'POST /api/user/process-submission', 'Request payload:', req.body);
        checkUserFn.getClientUserId(req, res, () => {
            userController.processDesignSubmission(req, res);
        });
    });

    router.put('/api/user/', (req, res) => {
        log.info('Request', 'PUT /api/user/', 'Request payload:', req.body);
        userController.processUpdateOneUser(req, res);
    });

    router.put('/api/user/design/', (req, res) => {
        log.info('Request', 'PUT /api/user/design/', 'Request payload:', req.body);
        validateFn.validateUpdateDesign(req, res, () => {
            userController.processUpdateOneDesign(req, res);
        });
    });

    router.post('/api/user/processInvitation/', (req, res) => {
        log.info('Request', 'POST /api/user/processInvitation/', 'Request payload:', req.body);
        checkUserFn.getClientUserId(req, res, () => {
            userController.processSendInvitation(req, res);
        });
    });

    router.get('/api/user/process-search-design/:pagenumber/:search?', validateFn.validateDesignSearchInput, checkUserFn.getClientUserId, (req, res, next) => {
        log.info('Request', `GET /api/user/process-search-design/${req.params.pagenumber}/${req.params.search}`, 'User ID:', req.headers.user);
        userController.processGetSubmissionData(req, res, next);
    });

    router.get('/api/user/process-search-user/:pagenumber/:search?', (req, res) => {
        log.info('Request', `GET /api/user/process-search-user/${req.params.pagenumber}/${req.params.search}`, 'User ID:', req.headers.user);
        verifyTokenFn(req, res, () => {
            checkUserFn.getClientUserId(req, res, () => {
                userController.processGetUserData(req, res);
            });
        });
    });

    router.get('/api/user/process-search-user-design/:pagenumber/:search?', (req, res) => {
        log.info('Request', `GET /api/user/process-search-user-design/${req.params.pagenumber}/${req.params.search}`);
        userController.processGetSubmissionsbyEmail(req, res);
    });

    router.get('/api/user/:recordId', (req, res) => {
        log.info('Request', `GET /api/user/${req.params.recordId}`);
        userController.processGetOneUserData(req, res);
    });

    router.get('/api/user/design/:fileId', (req, res) => {
        log.info('Request', `GET /api/user/design/${req.params.fileId}`);
        userController.processGetOneDesignData(req, res);
    });
};


