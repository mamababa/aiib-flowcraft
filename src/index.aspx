<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
    <%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
        <%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
            <%@ Import Namespace="Microsoft.SharePoint" %>

                <%@ Page Language="C#" MasterPageFile="~sitecollection/_catalogs/masterpage/akmii/MasterPage/YunGalaxyV3.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" %>

                    <asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
                    </asp:Content>

                    <asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">

                        <div id='app_content'>
                        </div>
                        <script src="https://cdn.yungalaxy.com/yeeoffice/pub/ver1.0/js/workflow3.0/common.js?_eda3d9c0cb310766bcbc"></script>
                        <script src="https://cdn.yungalaxy.com/yeeoffice/pub/ver1.0/js/workflow3.0/akmii-common.js?_eda3d9c0cb310766bcbc"></script>
                        <script src="https://cdn.yungalaxy.com/yeeoffice/pub/ver1.0/js/workflow3.0/vendors.js?_eda3d9c0cb310766bcbc"></script>
                        <script src="https://cdn.yungalaxy.com/yeeoffice/pub/ver1.0/js/workflow3.0/antd.js?_eda3d9c0cb310766bcbc"></script>
                        <script src="https://cdn.yungalaxy.com/yeeoffice/pub/ver1.0/js/workflow3.0/app.js?_eda3d9c0cb310766bcbc"></script>
                    </asp:Content>
                    <asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server" data-res-text="k_processSM">
                        AIIB IPM WORKFLOW</asp:Content>
                    <asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server"></asp:Content>
