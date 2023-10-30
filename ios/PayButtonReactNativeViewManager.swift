import Pay_Button_iOS

@objc(PayButtonReactNativeViewManager)
class PayButtonReactNativeViewManager: RCTViewManager {
    
    override func view() -> (PayButtonReactNativeView) {
        return PayButtonReactNativeView()
    }
    
    @objc override static func requiresMainQueueSetup() -> Bool {
        return false
    }
}

class PayButtonReactNativeView : UIView {
    var payButtonButton: PayButtonView!
    let controller = RCTPresentedViewController()
    
    @objc var onErrorCallback: RCTDirectEventBlock?
    @objc var onSuccessCallback: RCTDirectEventBlock?
    @objc var onOrderCreatedCallback: RCTDirectEventBlock?
    @objc var onChargeCreatedCallback: RCTDirectEventBlock?
    @objc var onReadyCallback: RCTDirectEventBlock?
    @objc var onClickedCallback: RCTDirectEventBlock?
    @objc var onCanceledCallback: RCTDirectEventBlock?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        commonInit()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        commonInit()
    }
    
    //MARK: - Private methods
    /// Used as a consolidated method to do all the needed steps upon creating the view
    private func commonInit() {
        payButtonButton = PayButtonView()
        self.addSubview(payButtonButton)
        setupConstraints()
    }
    
    private func setupConstraints() {
        // Defensive coding
        guard let payButtonButton = self.payButtonButton else {
            return
        }
        
        // Preprocessing needed setup
        payButtonButton.translatesAutoresizingMaskIntoConstraints = false
        
        // Define the web view constraints
        let top  = payButtonButton.topAnchor.constraint(equalTo: self.topAnchor)
        let left = payButtonButton.leftAnchor.constraint(equalTo: self.leftAnchor)
        let right = payButtonButton.rightAnchor.constraint(equalTo: self.rightAnchor)
        let bottom = payButtonButton.bottomAnchor.constraint(equalTo: self.bottomAnchor)
        NSLayoutConstraint.activate([left, right, top, bottom])
        
    }
    
    @objc var color: String = "" {
        didSet {
            self.backgroundColor = .clear
        }
    }
    
    @objc var config: [String:Any] = [:] {
        didSet {
            var payButtonType = PayButtonTypeEnum.BenefitPay
            let buttonType = config["buttonType"] as! String
            PayButtonTypeEnum.allCases.forEach { value in
                if (value.toString() == buttonType.uppercased()) {
                    payButtonType = value
                }
            }
            payButtonButton.initPayButton(configDict: config, delegate: self, payButtonType: payButtonType)
        }
    }
}

extension PayButtonReactNativeView: PayButtonDelegate {
    
    func onReady() {
        guard let onReadyCallback = onReadyCallback else {
            return
        }
        onReadyCallback([:])
    }
    
    
    func onClick() {
        guard let onClickedCallback = onClickedCallback else{
            return
        }
        onClickedCallback([:])
    }
    
    func onCanceled() {
        guard let onCanceledCallback = onCanceledCallback else{
            return
        }
        onCanceledCallback([:])
    }
    
    func onError(data: String) {
        guard let onErrorCallback = onErrorCallback else{
            return
        }
        onErrorCallback(["data": data])
    }
    
    func onSuccess(data: String) {
        guard let onSuccessCallback = onSuccessCallback else{
            return
        }
        onSuccessCallback(["data": data])
        
    }
    
    func onOrderCreated(data: String) {
        guard let onOrderCreatedCallback = onOrderCreatedCallback else{
            return
        }
        onOrderCreatedCallback(["data": data])
        
    }
    
    func onChargeCreated(data: String) {
        guard let onChargeCreatedCallback = onChargeCreatedCallback else{
            return
        }
        onChargeCreatedCallback(["data": data])
    }
    
    
    
}

