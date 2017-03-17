module.exports.injectConstantTo = (mod) => {
    mod.constant('tablesConfig', {
        questionsTable: {
            columns: [
                {
                    key: 'nombre',
                    label: 'Nombre'
                },
                {
                    key: 'tipo.nombre',
                    label: 'Tipo'
                },
                {
                    key: 'fecha_hora_creacion',
                    label: 'Hora de creacion'
                }
            ]
        },
        sectionsTable: {
            columns: [
                {
                    key: 'nombre',
                    label: 'Nombre'
                },
                {
                    key: 'fecha_hora_creacion',
                    label: 'Hora de creacion'
                }
            ]
        },
        surveysTable: {
            columns: [
                {
                    key: 'nombre',
                    label: 'Nombre'
                },
                {
                    key: 'fecha_hora_creacion',
                    label: 'Hora de creacion'
                }
            ]
        },
        surveySectionsTable: {
            columns: [
                {
                    key: 'codigo',
                    label: 'Código'
                },
                {
                    key: 'nombre',
                    label: 'Nombre'
                }
            ]
        }
    });
};
