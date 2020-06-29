//------------------------------------------------------------------------------
// <généré automatiquement>
//     Ce code a été généré par un outil.
//     //
//     Les changements apportés à ce fichier peuvent provoquer un comportement incorrect et seront perdus si
//     le code est regénéré.
// </généré automatiquement>
//------------------------------------------------------------------------------

namespace ServiceReferenceAuthentication
{


    [System.CodeDom.Compiler.GeneratedCodeAttribute("dotnet-svcutil", "1.0.0.1")]
    [System.ServiceModel.ServiceContractAttribute(Namespace = "http://fr.teleperformance.dev/", ConfigurationName = "ServiceReferenceAuthentication.TPFAuthenticationSoap")]
    public interface TPFAuthenticationSoap
    {

        [System.ServiceModel.OperationContractAttribute(Action = "http://fr.teleperformance.dev/HelloWorld", ReplyAction = "*")]
        [System.ServiceModel.XmlSerializerFormatAttribute(SupportFaults = true)]
        System.Threading.Tasks.Task<string> HelloWorldAsync();

        [System.ServiceModel.OperationContractAttribute(Action = "http://fr.teleperformance.dev/Authenticate", ReplyAction = "*")]
        [System.ServiceModel.XmlSerializerFormatAttribute(SupportFaults = true)]
        System.Threading.Tasks.Task<bool> AuthenticateAsync(string strLogin, string strPassword);

        [System.ServiceModel.OperationContractAttribute(Action = "http://fr.teleperformance.dev/AuthenticateCCMS", ReplyAction = "*")]
        [System.ServiceModel.XmlSerializerFormatAttribute(SupportFaults = true)]
        System.Threading.Tasks.Task<bool> AuthenticateCCMSAsync(string strLogin, string strPassword);

        [System.ServiceModel.OperationContractAttribute(Action = "http://fr.teleperformance.dev/AuthenticateLDAP", ReplyAction = "*")]
        [System.ServiceModel.XmlSerializerFormatAttribute(SupportFaults = true)]
        System.Threading.Tasks.Task<bool> AuthenticateLDAPAsync(string strLogin, string strPassword);

        [System.ServiceModel.OperationContractAttribute(Action = "http://fr.teleperformance.dev/Authenticate_ex", ReplyAction = "*")]
        [System.ServiceModel.XmlSerializerFormatAttribute(SupportFaults = true)]
        System.Threading.Tasks.Task<ServiceReferenceAuthentication.Authenticate_exResponseAuthenticate_exResult> Authenticate_exAsync(string strLogin, string strPassword);

        [System.ServiceModel.OperationContractAttribute(Action = "http://fr.teleperformance.dev/GetEmployeeByLogin", ReplyAction = "*")]
        [System.ServiceModel.XmlSerializerFormatAttribute(SupportFaults = true)]
        System.Threading.Tasks.Task<ServiceReferenceAuthentication.GetEmployeeByLoginResponseGetEmployeeByLoginResult> GetEmployeeByLoginAsync(string login, string pwd, string ccms_login);

        [System.ServiceModel.OperationContractAttribute(Action = "http://fr.teleperformance.dev/GetEmployee", ReplyAction = "*")]
        [System.ServiceModel.XmlSerializerFormatAttribute(SupportFaults = true)]
        System.Threading.Tasks.Task<ServiceReferenceAuthentication.GetEmployeeResponseGetEmployeeResult> GetEmployeeAsync(string login, string pwd, string employee_ident);

        [System.ServiceModel.OperationContractAttribute(Action = "http://fr.teleperformance.dev/GetEmployeeExtended", ReplyAction = "*")]
        [System.ServiceModel.XmlSerializerFormatAttribute(SupportFaults = true)]
        System.Threading.Tasks.Task<ServiceReferenceAuthentication.ArrayOfXElement> GetEmployeeExtendedAsync(string login, string pwd, string employee_ident);
    }

    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("dotnet-svcutil", "1.0.0.1")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://fr.teleperformance.dev/")]
    public partial class Authenticate_exResponseAuthenticate_exResult
    {

        private System.Xml.Linq.XElement[] anyField;

        private System.Xml.Linq.XElement any1Field;

        /// <remarks/>
        [System.Xml.Serialization.XmlAnyElementAttribute(Namespace = "http://www.w3.org/2001/XMLSchema", Order = 0)]
        public System.Xml.Linq.XElement[] Any
        {
            get
            {
                return this.anyField;
            }
            set
            {
                this.anyField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAnyElementAttribute(Namespace = "urn:schemas-microsoft-com:xml-diffgram-v1", Order = 1)]
        public System.Xml.Linq.XElement Any1
        {
            get
            {
                return this.any1Field;
            }
            set
            {
                this.any1Field = value;
            }
        }
    }

    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("dotnet-svcutil", "1.0.0.1")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://fr.teleperformance.dev/")]
    public partial class GetEmployeeByLoginResponseGetEmployeeByLoginResult
    {

        private System.Xml.Linq.XElement[] anyField;

        private System.Xml.Linq.XElement any1Field;

        /// <remarks/>
        [System.Xml.Serialization.XmlAnyElementAttribute(Namespace = "http://www.w3.org/2001/XMLSchema", Order = 0)]
        public System.Xml.Linq.XElement[] Any
        {
            get
            {
                return this.anyField;
            }
            set
            {
                this.anyField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAnyElementAttribute(Namespace = "urn:schemas-microsoft-com:xml-diffgram-v1", Order = 1)]
        public System.Xml.Linq.XElement Any1
        {
            get
            {
                return this.any1Field;
            }
            set
            {
                this.any1Field = value;
            }
        }
    }

    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("dotnet-svcutil", "1.0.0.1")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://fr.teleperformance.dev/")]
    public partial class GetEmployeeResponseGetEmployeeResult
    {

        private System.Xml.Linq.XElement[] anyField;

        private System.Xml.Linq.XElement any1Field;

        /// <remarks/>
        [System.Xml.Serialization.XmlAnyElementAttribute(Namespace = "http://www.w3.org/2001/XMLSchema", Order = 0)]
        public System.Xml.Linq.XElement[] Any
        {
            get
            {
                return this.anyField;
            }
            set
            {
                this.anyField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAnyElementAttribute(Namespace = "urn:schemas-microsoft-com:xml-diffgram-v1", Order = 1)]
        public System.Xml.Linq.XElement Any1
        {
            get
            {
                return this.any1Field;
            }
            set
            {
                this.any1Field = value;
            }
        }
    }

    [System.CodeDom.Compiler.GeneratedCodeAttribute("dotnet-svcutil", "1.0.0.1")]
    public interface TPFAuthenticationSoapChannel : ServiceReferenceAuthentication.TPFAuthenticationSoap, System.ServiceModel.IClientChannel
    {
    }

    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("dotnet-svcutil", "1.0.0.1")]
    public partial class TPFAuthenticationSoapClient : System.ServiceModel.ClientBase<ServiceReferenceAuthentication.TPFAuthenticationSoap>, ServiceReferenceAuthentication.TPFAuthenticationSoap
    {

        /// <summary>
        /// Implémentez cette méthode partielle pour configurer le point de terminaison de service.
        /// </summary>
        /// <param name="serviceEndpoint">Point de terminaison à configurer</param>
        /// <param name="clientCredentials">Informations d'identification du client</param>
        static partial void ConfigureEndpoint(System.ServiceModel.Description.ServiceEndpoint serviceEndpoint, System.ServiceModel.Description.ClientCredentials clientCredentials);

        public TPFAuthenticationSoapClient(EndpointConfiguration endpointConfiguration) :
                base(TPFAuthenticationSoapClient.GetBindingForEndpoint(endpointConfiguration), TPFAuthenticationSoapClient.GetEndpointAddress(endpointConfiguration))
        {
            this.Endpoint.Name = endpointConfiguration.ToString();
            ConfigureEndpoint(this.Endpoint, this.ClientCredentials);
        }

        public TPFAuthenticationSoapClient(EndpointConfiguration endpointConfiguration, string remoteAddress) :
                base(TPFAuthenticationSoapClient.GetBindingForEndpoint(endpointConfiguration), new System.ServiceModel.EndpointAddress(remoteAddress))
        {
            this.Endpoint.Name = endpointConfiguration.ToString();
            ConfigureEndpoint(this.Endpoint, this.ClientCredentials);
        }

        public TPFAuthenticationSoapClient(EndpointConfiguration endpointConfiguration, System.ServiceModel.EndpointAddress remoteAddress) :
                base(TPFAuthenticationSoapClient.GetBindingForEndpoint(endpointConfiguration), remoteAddress)
        {
            this.Endpoint.Name = endpointConfiguration.ToString();
            ConfigureEndpoint(this.Endpoint, this.ClientCredentials);
        }

        public TPFAuthenticationSoapClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) :
                base(binding, remoteAddress)
        {
        }

        public System.Threading.Tasks.Task<string> HelloWorldAsync()
        {
            return base.Channel.HelloWorldAsync();
        }

        public System.Threading.Tasks.Task<bool> AuthenticateAsync(string strLogin, string strPassword)
        {
            return base.Channel.AuthenticateAsync(strLogin, strPassword);
        }

        public System.Threading.Tasks.Task<bool> AuthenticateCCMSAsync(string strLogin, string strPassword)
        {
            return base.Channel.AuthenticateCCMSAsync(strLogin, strPassword);
        }

        public System.Threading.Tasks.Task<bool> AuthenticateLDAPAsync(string strLogin, string strPassword)
        {
            return base.Channel.AuthenticateLDAPAsync(strLogin, strPassword);
        }

        public System.Threading.Tasks.Task<ServiceReferenceAuthentication.Authenticate_exResponseAuthenticate_exResult> Authenticate_exAsync(string strLogin, string strPassword)
        {
            return base.Channel.Authenticate_exAsync(strLogin, strPassword);
        }

        public System.Threading.Tasks.Task<ServiceReferenceAuthentication.GetEmployeeByLoginResponseGetEmployeeByLoginResult> GetEmployeeByLoginAsync(string login, string pwd, string ccms_login)
        {
            return base.Channel.GetEmployeeByLoginAsync(login, pwd, ccms_login);
        }

        public System.Threading.Tasks.Task<ServiceReferenceAuthentication.GetEmployeeResponseGetEmployeeResult> GetEmployeeAsync(string login, string pwd, string employee_ident)
        {
            return base.Channel.GetEmployeeAsync(login, pwd, employee_ident);
        }

        public System.Threading.Tasks.Task<ServiceReferenceAuthentication.ArrayOfXElement> GetEmployeeExtendedAsync(string login, string pwd, string employee_ident)
        {
            return base.Channel.GetEmployeeExtendedAsync(login, pwd, employee_ident);
        }

        public virtual System.Threading.Tasks.Task OpenAsync()
        {
            return System.Threading.Tasks.Task.Factory.FromAsync(((System.ServiceModel.ICommunicationObject)(this)).BeginOpen(null, null), new System.Action<System.IAsyncResult>(((System.ServiceModel.ICommunicationObject)(this)).EndOpen));
        }

        public virtual System.Threading.Tasks.Task CloseAsync()
        {
            return System.Threading.Tasks.Task.Factory.FromAsync(((System.ServiceModel.ICommunicationObject)(this)).BeginClose(null, null), new System.Action<System.IAsyncResult>(((System.ServiceModel.ICommunicationObject)(this)).EndClose));
        }

        private static System.ServiceModel.Channels.Binding GetBindingForEndpoint(EndpointConfiguration endpointConfiguration)
        {
            if ((endpointConfiguration == EndpointConfiguration.TPFAuthenticationSoap))
            {
                System.ServiceModel.BasicHttpBinding result = new System.ServiceModel.BasicHttpBinding();
                result.MaxBufferSize = int.MaxValue;
                result.ReaderQuotas = System.Xml.XmlDictionaryReaderQuotas.Max;
                result.MaxReceivedMessageSize = int.MaxValue;
                result.AllowCookies = true;
                result.Security.Mode = System.ServiceModel.BasicHttpSecurityMode.Transport;
                return result;
            }
            if ((endpointConfiguration == EndpointConfiguration.TPFAuthenticationSoap12))
            {
                System.ServiceModel.Channels.CustomBinding result = new System.ServiceModel.Channels.CustomBinding();
                System.ServiceModel.Channels.TextMessageEncodingBindingElement textBindingElement = new System.ServiceModel.Channels.TextMessageEncodingBindingElement();
                textBindingElement.MessageVersion = System.ServiceModel.Channels.MessageVersion.CreateVersion(System.ServiceModel.EnvelopeVersion.Soap12, System.ServiceModel.Channels.AddressingVersion.None);
                result.Elements.Add(textBindingElement);
                System.ServiceModel.Channels.HttpsTransportBindingElement httpsBindingElement = new System.ServiceModel.Channels.HttpsTransportBindingElement();
                httpsBindingElement.AllowCookies = true;
                httpsBindingElement.MaxBufferSize = int.MaxValue;
                httpsBindingElement.MaxReceivedMessageSize = int.MaxValue;
                result.Elements.Add(httpsBindingElement);
                return result;
            }
            throw new System.InvalidOperationException(string.Format("Le point de terminaison nommé \'{0}\' est introuvable.", endpointConfiguration));
        }

        private static System.ServiceModel.EndpointAddress GetEndpointAddress(EndpointConfiguration endpointConfiguration)
        {
            if ((endpointConfiguration == EndpointConfiguration.TPFAuthenticationSoap))
            {
                return new System.ServiceModel.EndpointAddress("https://public-test.teleperformance.fr/TPFAuthentication/TPFAuthentication.asmx");
            }
            if ((endpointConfiguration == EndpointConfiguration.TPFAuthenticationSoap12))
            {
                return new System.ServiceModel.EndpointAddress("https://public-test.teleperformance.fr/TPFAuthentication/TPFAuthentication.asmx");
            }
            throw new System.InvalidOperationException(string.Format("Le point de terminaison nommé \'{0}\' est introuvable.", endpointConfiguration));
        }

        public enum EndpointConfiguration
        {

            TPFAuthenticationSoap,

            TPFAuthenticationSoap12,
        }
    }

    [System.Xml.Serialization.XmlSchemaProviderAttribute(null, IsAny = true)]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("dotnet-svcutil", "1.0.0.1")]
    public partial class ArrayOfXElement : object, System.Xml.Serialization.IXmlSerializable
    {

        private System.Collections.Generic.List<System.Xml.Linq.XElement> nodesList = new System.Collections.Generic.List<System.Xml.Linq.XElement>();

        public ArrayOfXElement()
        {
        }

        public virtual System.Collections.Generic.List<System.Xml.Linq.XElement> Nodes
        {
            get
            {
                return this.nodesList;
            }
        }

        public virtual System.Xml.Schema.XmlSchema GetSchema()
        {
            throw new System.NotImplementedException();
        }

        public virtual void WriteXml(System.Xml.XmlWriter writer)
        {
            System.Collections.Generic.IEnumerator<System.Xml.Linq.XElement> e = nodesList.GetEnumerator();
            for (
            ; e.MoveNext();
            )
            {
                ((System.Xml.Serialization.IXmlSerializable)(e.Current)).WriteXml(writer);
            }
        }

        public virtual void ReadXml(System.Xml.XmlReader reader)
        {
            for (
            ; (reader.NodeType != System.Xml.XmlNodeType.EndElement);
            )
            {
                if ((reader.NodeType == System.Xml.XmlNodeType.Element))
                {
                    System.Xml.Linq.XElement elem = new System.Xml.Linq.XElement("default");
                    ((System.Xml.Serialization.IXmlSerializable)(elem)).ReadXml(reader);
                    Nodes.Add(elem);
                }
                else
                {
                    reader.Skip();
                }
            }
        }
    }
}
