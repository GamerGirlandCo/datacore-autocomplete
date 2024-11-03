declare module "autocomplete.worker" {
    const WorkerFactory: new () => Worker;
    export default WorkerFactory;
}
