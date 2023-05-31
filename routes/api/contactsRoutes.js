const express = require('express');
const contactsControllers = require('../../controllers/controllers-contacts');
const { schemas } = require('../../modals/contact');
const { validateBody } = require('../../utils');
const { authentificate, isValidId } = require('../../middleWares');
const router = express.Router();

router.use(authentificate);

router.get('/', contactsControllers.getAllContacts);

router.get('/:id', isValidId, contactsControllers.getOneContact);

router.post('/', validateBody(schemas.addSchema), contactsControllers.postAddContact);

router.put('/:id', isValidId, validateBody(schemas.addSchema), contactsControllers.putUpdateContact);

router.patch(
  '/:id/favorite',
  isValidId,
  validateBody(schemas.updateFavoriteContactSchema),
  contactsControllers.putUpdateContactFavorite,
);

router.delete('/:id', isValidId, contactsControllers.removeContact);

module.exports = router;
