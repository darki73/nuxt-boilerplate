import firebase from 'firebase/app';
import 'firebase/firestore';

/**
 * Process and update "maintenance" mode information
 * @param { object } store
 * @param { object } configuration
 * @return { { enabled: boolean, start: string, end: string } }
 */
function MaintenanceMode({ store }, configuration) {
    const maintenanceMode = {
        enabled: configuration.maintenance,
        start: configuration.maintenance_start_time,
        end: configuration.maintenance_end_time,
    };
    store.dispatch('application/updateMaintenanceModeInformation', maintenanceMode);
    return maintenanceMode;
}

/**
 * Process and update "coming soon" mode information
 * @param { object } store
 * @param { object } configuration
 * @return { { enabled: boolean, time: string } }
 */
function ComingSoonMode({ store }, configuration) {
    const comingSoonMode = {
        enabled: configuration.coming_soon,
        time: configuration.coming_soon_end_time,
    };
    store.dispatch('application/updateComingSoonModeInformation', comingSoonMode);
    return comingSoonMode;
}

/**
 * Initialize empty values for context
 * @param { object } context
 */
function InitializeAsEmpty(context) {
    context.$settings.maintenanceMode = {
        enabled: false,
        start: '',
        end: ''
    };
    context.$settings.comingSoonMode = {
        enabled: false,
        time: ''
    };
}

export default async function (context) {
    context.$settings = {};
    if (!firebase.apps.length) {
        firebase.initializeApp(context.env.firebase);
    }
    const database = firebase.firestore();
    database
        .collection('settings').doc(context.env.application.env)
        .onSnapshot((document) => {
            const configuration = document.data();
            context.$settings.maintenanceMode = MaintenanceMode(context.app, configuration);
            context.$settings.comingSoonMode = ComingSoonMode(context.app, configuration);
        });
    if (
        !context.$settings.hasOwnProperty('maintenanceMode')
        || !context.$settings.hasOwnProperty('comingSoonMode')
    ) {
        await database
            .collection('settings').doc(context.env.application.env).get()
            .then((document) => {
                if (document.exists) {
                    const configuration = document.data();
                    context.$settings.maintenanceMode = MaintenanceMode(context.app, configuration);
                    context.$settings.comingSoonMode = ComingSoonMode(context.app, configuration);
                } else {
                    InitializeAsEmpty(context);
                }
            })
            .catch(() => {
                InitializeAsEmpty(context);
            });
    }
}
