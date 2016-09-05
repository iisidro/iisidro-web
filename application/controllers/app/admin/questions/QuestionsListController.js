module.exports.injectControllerTo = (mod) => {
    mod.controller('QuestionsListCtrl', [
        'Questions',
        '$state',
        function (Questions, $state) {

            this.initialize = () => {
                Questions.getInstances()
                    .then((response) => {
                        console.log(response);
                    })
                    .catch(() => {

                    });
            };

            this.editQuestion = (question) => {
                $state.go('base.app.admin.questions.edit', {
                    questionId: '123'
                });
            };

            this.questions = [
                {
                    nombre: 'Pregunta 1',
                    tipo: 'texto'
                },
                {
                    nombre: 'Pregunta 2',
                    tipo: 'texto'
                },
                {
                    nombre: 'Pregunta 3',
                    tipo: 'texto'
                },
                {
                    nombre: 'Pregunta 4',
                    tipo: 'texto'
                }
            ];

            this.columns = [
                {
                    key: 'nombre',
                    label: 'Nombre'
                },
                {
                    key: 'tipo',
                    label: 'Tipo'
                }
            ];

            this.actions = [
                {
                    label: 'Editar',
                    onCall: this.editQuestion
                },
                {
                    label: 'Eliminar',
                    onCall: this.deleteQuestion
                }
            ];
        }
    ]);
};
