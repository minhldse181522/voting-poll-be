/**
 * @swagger
 * /api/settings:
 *   get:
 *     summary: Get all settings
 *     tags:
 *       - Setting
 *     responses:
 *       200:
 *         description: List of settings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: settings retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "1"
 *                       bgDesktop:
 *                         type: string
 *                         example: "https://example.com/desktop-bg.jpg"
 *                       bgPhone:
 *                         type: string
 *                         example: "https://example.com/phone-bg.jpg"
 */

/**
 * @swagger
 * /api/settings:
 *   post:
 *     summary: Create a new setting
 *     tags:
 *       - Setting
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bgDesktop:
 *                 type: string
 *                 example: "https://example.com/desktop-bg.jpg"
 *               bgPhone:
 *                 type: string
 *                 example: "https://example.com/phone-bg.jpg"
 *     responses:
 *       201:
 *         description: Setting created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Setting created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1"
 *                     bgDesktop:
 *                       type: string
 *                       example: "https://example.com/desktop-bg.jpg"
 *                     bgPhone:
 *                       type: string
 *                       example: "https://example.com/phone-bg.jpg"
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/settings/{id}:
 *   delete:
 *     summary: Delete a setting by ID
 *     tags:
 *       - Setting
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The setting ID
 *     responses:
 *       200:
 *         description: Setting deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Setting not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/settings/{id}:
 *   put:
 *     summary: Update a setting by ID
 *     tags:
 *       - Setting
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The setting ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bgDesktop:
 *                 type: string
 *                 example: "https://example.com/desktop-bg.jpg"
 *               bgPhone:
 *                 type: string
 *                 example: "https://example.com/phone-bg.jpg"
 *     responses:
 *       200:
 *         description: Setting updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Setting not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/settingLanguage/{id}:
 *   put:
 *     summary: Update language
 *     tags:
 *       - Setting
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The setting ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               language:
 *                 type: string
 *                 example: "vi"
 *     responses:
 *       200:
 *         description: Language updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Language not found
 *       500:
 *         description: Internal server error
 */
