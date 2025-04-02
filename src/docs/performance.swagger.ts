/**
 * @swagger
 * /api/performances:
 *   get:
 *     summary: Get all performances
 *     tags:
 *       - Performances
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
 *     summary: Update a performance by ID
 *     tags:
 *       - Performances
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
 *               vote:
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
