const TYPES: { [index: string]: any } = {
    //
    // Constants
    //
    JsonMonitoringEnabled: Symbol.for("JsonMonitoringEnabled"),
    MySqlHost: Symbol.for("MySqlHost"),
    MySqlDBName: Symbol.for("MySqlDBName"),
    MySqlUser: Symbol.for("MySqlUser"),
    MySqlPwd: Symbol.for("MySqlPwd"),
    MySqlPort: Symbol.for("MySqlPort"),
    LogLevel: Symbol.for("LogLevel"),
    //
    // MYSQL Pool
    //
    MySqlPool: Symbol.for("<MySqlConnection>"),
    //
    // Repositories
    //
    FakeDataRepository: Symbol.for("<FakeDataRepository>"),
    MySqlDataRepository: Symbol.for("<DynamoDBDataRepository>"),
    SelectedDataRepository: Symbol.for("<SelectedDataRepository>"),
    //
    // Monitoring Strategies
    //
    JsonMonitoringStrategies: Symbol.for("<JsonMonitoringStrategies>"),
    CachedImageServerJsonMonitoringStrategy: Symbol.for(
        "<CachedImageServerJsonMonitoringStrategy>",
    ),
    DefaultJsonMonitoringStrategy: Symbol.for(
        "<DefaultJsonMonitoringStrategy>",
    ),
    Logger: Symbol.for("<ILogger>"),
    MonitoringService: Symbol.for("<MonitoringService>"),
};

export default TYPES;
