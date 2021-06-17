import {myFirebase} from "../../utils/configureFireStore";

const db = myFirebase.database().ref("/categories");

class CategoriesServices {
    get() {
        return db;
    }

    create(form) {
        return db.push(form);
    }

    update(key, value) {
        return db.child(key).update(value);
    }

    destroy(key) {
        return db.child(key).remove();
    }

    massDestroy() {
        return db.remove();
    }
}

export default new CategoriesServices();