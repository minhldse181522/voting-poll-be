/**
 * @swagger
 * /api/performances:
 *   get:
 *     summary: Get all performances
 *     tags:
 *       - Performance
 *     responses:
 *       200:
 *         description: List of performances retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: performances retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "1"
 *                       name:
 *                         type: string
 *                         example: "Performance A"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/performanceByCategory/{id}:
 *   get:
 *     summary: Get all performances by categories
 *     tags:
 *       - Performance
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The category ID
 *     responses:
 *       200:
 *         description: List of performances by categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: performances retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "1"
 *                       name:
 *                         type: string
 *                         example: "Team 1"
 *                       vote:
 *                         type: integer
 *                         example: 5
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/performances/{id}:
 *   put:
 *     summary: Update vote performance by ID
 *     tags:
 *       - Performance
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The performance ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Performance updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Performance not found
 */

/**
 * @swagger
 * /api/performance:
 *   post:
 *     summary: Create a new performacne
 *     tags:
 *       - Performance
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the performance
 *                 example: "Một triệu lý do"
 *               bgDesktop:
 *                 type: string
 *                 description: Background of Desktop (có thể để trống)
 *                 example: "https:..."
 *               bgPhone:
 *                 type: string
 *                 description: Background of Phone (có thể để trống)
 *                 example: "https:..."
 *     responses:
 *       201:
 *         description: Performance created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The performance ID
 *                   example: 1
 *               name:
 *                 type: string
 *                 description: The name of the performance
 *                 example: "Một triệu lý do"
 *               bgDesktop:
 *                 type: string
 *                 description: Background of Desktop (có thể để trống)
 *                 example: "https:..."
 *               bgPhone:
 *                 type: string
 *                 description: Background of Phone (có thể để trống)
 *                 example: "https:..."
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/performance/{id}:
 *   put:
 *     summary: Update a performance by ID
 *     tags:
 *       - Performance
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The performance ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Team 5"
 *               bgDesktop:
 *                 type: string
 *                 example: "https://..."
 *               bgPhone:
 *                 type: string
 *                 example: "https://..."
 *     responses:
 *       200:
 *         description: Performance updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Performance not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/performance/{id}:
 *   delete:
 *     summary: Delete a performance by ID
 *     tags:
 *       - Performance
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The performance ID
 *     responses:
 *       200:
 *         description: Performance deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */