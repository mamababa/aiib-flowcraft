interface ProcInstDiagram extends BaseModel {
    /** 资源 */
    ResourceStr : string;
    /** 当前活跃的activity列表 */
    CurrentActivityList : string[];
}

interface ProcInstDiagramResponse extends AkResponse {
    Data?: ProcInstDiagram;
}
